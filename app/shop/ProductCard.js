import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const { name, image, price, link } = product;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 w-full">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-white">{name}</h3>
        <p className="text-gray-400 mb-4">${price}</p>
        <Link href={link}>
          <span className="inline-block bg-red-600 hover:bg-red-700 text-white text-lg px-4 py-2 rounded-md font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            Purchase
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;