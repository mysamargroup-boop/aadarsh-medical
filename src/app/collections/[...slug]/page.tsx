import { products, getProductUrl, getCategoryUrl } from '@/lib/product-data';
import CollectionDetailClient from './CollectionDetailClient';
import { Metadata } from 'next';

export function generateStaticParams() {
  return products.map((product) => {
    const url = getProductUrl(product);
    // url format: /collections/{catSlug}/{subCatSlug}/{productSlug}-{id}
    const slug = url.replace('/collections/', '').split('/');
    return { slug };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const url = `/collections/${slug.join('/')}/`;
  const productId = slug[slug.length - 1].split('-').pop();
  const product = products.find(p => p.id === productId);

  if (!product) return { title: 'Product Not Found | Adarsh Medical' };

  // Build a rich, detailed meta description
  const composition = product.molecules || product.composition || product.material || '';
  const usageSnippet = product.usage ? ` ${product.usage.slice(0, 80)}` : '';
  const descriptionParts = [
    `Buy ${product.name}`,
    product.company ? `by ${product.company}` : '',
    composition ? `(${composition})` : '',
    `at ₹${product.price.toFixed(2)}.`,
    product.description.slice(0, 120),
    usageSnippet ? `${usageSnippet}.` : '',
    'Order from Adarsh Medical Store, authorized pharma distributor.',
  ].filter(Boolean);
  const metaDescription = descriptionParts.join(' ').slice(0, 320);

  return {
    title: `${product.name} - ${composition || product.format} | Buy Online | Adarsh Medical`,
    description: metaDescription,
    alternates: {
      canonical: `https://ad2025.in${url}`,
    },
    openGraph: {
      title: `${product.name} | ${product.company} | Adarsh Medical`,
      description: metaDescription,
      url: `https://ad2025.in${url}`,
      siteName: 'Adarsh Medical',
      images: [
        {
          url: product.img.startsWith('http') ? product.img : `https://ad2025.in${product.img}`,
          width: 600,
          height: 600,
          alt: `${product.name} - ${product.company}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Adarsh Medical`,
      description: metaDescription,
    },
  };
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  // Resolve product for JSON-LD schema (server component)
  const resolveProduct = async () => {
    const { slug } = await params;
    const productId = slug[slug.length - 1].split('-').pop();
    return products.find(p => p.id === productId);
  };

  return <ProductPageWrapper resolveProduct={resolveProduct} />;
}

async function ProductPageWrapper({ resolveProduct }: { resolveProduct: () => Promise<any> }) {
  const product = await resolveProduct();

  if (!product) return <CollectionDetailClient />;

  const productUrl = getProductUrl(product);
  const fullUrl = `https://ad2025.in${productUrl}/`;
  const imageUrl = product.img.startsWith('http') ? product.img : `https://ad2025.in${product.img}`;

  // Product JSON-LD Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": imageUrl,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.company
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.company
    },
    "sku": product.id,
    "category": product.cat,
    ...(product.molecules && { "activeIngredient": product.molecules }),
    ...(product.composition && { "activeIngredient": product.composition }),
    "offers": {
      "@type": "Offer",
      "url": fullUrl,
      "priceCurrency": "INR",
      "price": product.price.toFixed(2),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Adarsh Medical Store"
      }
    },
    ...(product.usage && {
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "Usage",
        "value": product.usage
      }
    })
  };

  // Breadcrumb JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ad2025.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": "https://ad2025.in/shop/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.cat,
        "item": `https://ad2025.in${getCategoryUrl(product.cat)}/`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": fullUrl
      }
    ]
  };

  // MedicalProduct schema for medicines
  const medicalSchema = product.rx ? {
    "@context": "https://schema.org",
    "@type": "Drug",
    "name": product.name,
    "activeIngredient": product.molecules || product.composition || '',
    "manufacturer": {
      "@type": "Organization",
      "name": product.company
    },
    "dosageForm": product.format,
    ...(product.usage && { "clinicalPharmacology": product.usage }),
    ...(product.sideEffects && product.sideEffects !== 'Placeholder for sideEffects. Please update.' && {
      "warning": product.sideEffects
    }),
    "prescriptionStatus": "PrescriptionOnly",
    "isAvailableGenerically": false,
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {medicalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
        />
      )}
      <CollectionDetailClient />
    </>
  );
}
