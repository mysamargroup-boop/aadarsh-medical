"use client"

import React from 'react';
import { GraduationCap, Award, Building2, Users, Shield, Heart, Clock, BadgeCheck } from 'lucide-react';

export default function AboutClient() {
  return (
    <div className="pt-24 md:pt-36 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 medical-gradient-hero opacity-5" />
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-secondary/20">
              <BadgeCheck size={14} /> About Us
            </span>
          </div>

          {/* Admin Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl shadow-secondary/20 ring-1 ring-border">
              <img src="/profile.webp" alt="Abhishek Kumar Patel - Owner" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          <h1 className="text-center font-headline font-bold text-3xl md:text-5xl text-primary leading-tight mb-6">
            Abhishek Kumar Patel
          </h1>

          {/* Designation Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-200">
              <Building2 size={16} />
              Owner – Adarsh Medical Stores
            </span>
            <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 px-4 py-2 rounded-xl text-sm font-bold border border-teal-200">
              <Users size={16} />
              Secretary – Aushadhi Vikreta Sangh, Garhakota
            </span>
          </div>

          {/* Qualification & Experience */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white rounded-2xl px-5 py-3 shadow-md border border-border">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Qualification</p>
                <p className="text-sm font-bold text-primary">Master of Pharmacy (M.Pharm)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-2xl px-5 py-3 shadow-md border border-border">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Experience</p>
                <p className="text-sm font-bold text-primary">25+ Years in Pharmaceutical Industry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent my-2" />
      </div>

      {/* Profile Description */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border relative overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[80px]" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-[60px]" />

          <div className="relative z-10">
            <h2 className="font-headline font-bold text-2xl md:text-3xl text-primary mb-6 flex items-center gap-3">
              <div className="w-10 h-10 gradient-button rounded-xl flex items-center justify-center text-white">
                <Award size={20} />
              </div>
              Profile Description
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                <strong className="text-primary">Abhishek Kumar Patel</strong> is an experienced, skilled, and respected pharmaceutical professional with over <strong className="text-primary">25 years</strong> of extensive experience in the pharma industry. Since <strong className="text-primary">2015</strong>, he has been consistently providing quality healthcare services through <strong className="text-primary">Adarsh Medical Stores</strong> and has established a strong reputation in the region for his dedication, reliability, and commitment to delivering genuine medicines.
              </p>

              <p>
                With a <strong className="text-primary">Master of Pharmacy (M.Pharm)</strong> degree, he combines in-depth academic knowledge with practical expertise to offer safe, effective, and trustworthy medical guidance to patients, while strictly adhering to ethical pharmaceutical practices.
              </p>

              <p>
                In addition, as the <strong className="text-primary">Secretary of the Aushadhi Vikreta Sangh, Garhakota</strong>, he actively works for the welfare of fellow chemists and promotes the growth and development of the pharmaceutical community in the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <Shield size={24} />,
              title: 'Ethical Practices',
              desc: 'Strictly adheres to ethical pharmaceutical practices and guidelines.',
              color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
            },
            {
              icon: <Heart size={24} />,
              title: 'Patient First',
              desc: 'Committed to delivering genuine medicines and quality healthcare services.',
              color: 'bg-teal-50 text-teal-600 border-teal-200',
            },
            {
              icon: <GraduationCap size={24} />,
              title: 'Expert Knowledge',
              desc: 'M.Pharm qualified with deep academic and practical pharmaceutical expertise.',
              color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
            },
            {
              icon: <Users size={24} />,
              title: 'Community Leader',
              desc: 'Actively works for the welfare and growth of the pharmaceutical community.',
              color: 'bg-sky-50 text-sky-600 border-sky-200',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-headline font-bold text-primary text-base mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Serving Since Banner */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="medical-gradient-dark rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
          <div className="relative z-10">
            <p className="text-teal-200 text-sm font-bold uppercase tracking-widest mb-2">Serving Since 2015</p>
            <h3 className="font-headline font-bold text-2xl md:text-3xl mb-3">
              Trusted by Thousands of Patients
            </h3>
            <p className="text-teal-100/80 max-w-xl mx-auto leading-relaxed">
              With a legacy of trust, quality, and dedication, Adarsh Medical Stores continues to be the preferred choice for genuine medicines and healthcare solutions in Garhakota and surrounding regions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
