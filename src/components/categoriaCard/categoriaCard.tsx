"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { categoriasData } from './categoriasData';
import Link from 'next/link';

interface CategoryItemProps {
    imageUrl: StaticImageData; 
    label: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ imageUrl, label }) => {
    return (
        <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center p-4 overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                <Image 
                    src={imageUrl} 
                    alt={label} 
                    className="object-contain w-full h-full"
                    placeholder="blur" 
                />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors uppercase tracking-wide">
                {label}
            </p>
        </div>
    );
};

export default function CategoriaCard() {
    return (
        <section className="max-w-6xl mx-auto bg-slate-50">
            <div className="grid grid-row-1 sm:grid-row-2 md:grid-row-4 gap-4">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-slate-800 text-center md:text-left">
                    Navegue por Categorias
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                    {categoriasData.map((it) => (
                        <Link 
                                key={it.id} 
                                href={`/categorias/${it.name}`} 
                                className="block h-full" 
                            > 
                            <CategoryItem
                                key={it.id}
                                imageUrl={it.imageUrl}
                                label={it.label}
                            />
                        </Link>

                    ))}
                </div>
            </div>
        </section>
    );
}