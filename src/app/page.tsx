'use client';
import { useState } from 'react';
import kentang from './makanan.json';
import drinks from './minuman.json';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [cart, setCart] = useState([]);

  function addToCart(baseItem, selectedOptions) {
    // Hitung total harga opsi tambahan
    const extraCost = selectedOptions.reduce((sum, o) => sum + o.harga, 0);

    const newItem = {
      nama: baseItem.nama,
      harga: baseItem.harga,
      opsiTambahan: selectedOptions,
      totalHarga: baseItem.harga + extraCost,
      qty: 1,
    };

    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.nama === newItem.nama &&
          JSON.stringify(i.opsiTambahan) ===
            JSON.stringify(newItem.opsiTambahan)
      );

      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, newItem];
    });
  }

  function handlePayment() {
    alert('Pembayaran berhasil 🎉');
    setCart([]);
  }

  return (
    <div className='p-4 space-y-8'>
      {/* Makanan */}
      <div>
        <h1 className='text-2xl font-bold'>Makanan</h1>
        <FoodCard data={kentang} onAdd={addToCart} />
      </div>

      {/* Minuman */}
      <div>
        <h1 className='text-2xl font-bold'>Minuman</h1>
        <div className='flex flex-wrap gap-4'>
          {drinks.map((drink, i) => (
            <FoodCard key={i} data={drink} onAdd={addToCart} />
          ))}
        </div>
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div className='border-t pt-4'>
          <h2 className='text-xl font-semibold'>Daftar Pesanan</h2>
          {cart.map((item, i) => (
            <div key={i} className='flex flex-col border-b py-2'>
              <span>
                {item.nama} x{item.qty}
              </span>
              {item.opsiTambahan.length > 0 && (
                <ul className='text-sm text-gray-500 list-disc ml-4'>
                  {item.opsiTambahan.map((opt, j) => (
                    <li key={j}>
                      {opt.nama} (+Rp{opt.harga})
                    </li>
                  ))}
                </ul>
              )}
              <span className='font-medium'>
                Rp{item.totalHarga * item.qty}
              </span>
            </div>
          ))}
          <p className='mt-4 font-bold'>
            Total: Rp
            {cart.reduce((sum, i) => sum + i.totalHarga * i.qty, 0)}
          </p>
          <Button className='mt-4 rounded' onClick={handlePayment}>
            Bayar
          </Button>
        </div>
      )}
    </div>
  );
}

// Komponen untuk card makanan/minuman
function FoodCard({ data, onAdd }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function toggleOption(option) {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  }

  return (
    <Card className='w-fit'>
      <CardHeader className='w-72'>
        <Image
          src={data.image}
          alt={data.nama}
          width={500}
          height={500}
          className='rounded object-cover'
        />
      </CardHeader>
      <CardContent>
        <CardTitle className='text-xl'>{data.nama}</CardTitle>
        <CardDescription>Harga: Rp{data.harga}</CardDescription>

        {/* Opsi Tambahan */}
        {data.opsi_tambahan.length > 0 && (
          <div className='mt-4 space-y-1'>
            <p className='font-medium'>Opsi Tambahan</p>
            {data.opsi_tambahan.map((opsi, i) => (
              <Label key={i} className='flex items-center gap-2'>
                <Checkbox
                  checked={selectedOptions.includes(opsi)}
                  onCheckedChange={() => toggleOption(opsi)}
                />
                <span>
                  {opsi.nama} (+Rp{opsi.harga})
                </span>
              </Label>
            ))}
          </div>
        )}

        <Button
          className='mt-4 rounded'
          onClick={() => onAdd(data, selectedOptions)}
        >
          Tambah ke Keranjang
        </Button>
      </CardContent>
    </Card>
  );
}
