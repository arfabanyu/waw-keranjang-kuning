'use client';
import { useState } from 'react';
import kentang from './makanan.json';
import drinks from './minuman.json';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/cart-item';
import { OpsiTambahan } from '@/types/opsi-tambahan';
import { Food } from '@/types/food';
import { Input } from '@/components/ui/input';

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState<string>('');

  function addToCart(baseItem: Food, selectedOptions: OpsiTambahan[]) {
    // Hitung total harga opsi tambahan
    const extraCost = selectedOptions.reduce(
      (sum: number, o: { harga: number }) => sum + o.harga,
      0
    );

    const newItem = {
      nama: baseItem.nama,
      harga: baseItem.harga,
      opsiTambahan: selectedOptions,
      totalHarga: baseItem.harga + extraCost,
      image: baseItem.image,
      qty: 1,
    };

    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.nama === newItem.nama &&
          i?.opsiTambahan.length === newItem.opsiTambahan.length &&
          i.opsiTambahan.every(
            (opt, idx) =>
              opt.nama === newItem.opsiTambahan[idx].nama &&
              opt.harga === newItem.opsiTambahan[idx].harga
          )
      );

      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, newItem];
    });
  }

  function updateQty(index: number, change: number) {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].qty += change;
      console.log('update');

      // Hapus kalau qty <= 0
      if (updated[index].qty <= 0) {
        updated.splice(index, 1);
      }

      return updated;
    });
  }

  function handlePayment() {
    alert('Pembayaran berhasil 🎉');
    setCart([]);
  }

  return (
    <div className='p-4 space-y-8 relative bg-slate-900 text-white'>
      <div className='text-center flex justify-center items-center gap-4'>
        <Image
          src={'/images/waw-keranjang-kuning-logo.png'}
          alt=''
          width={2000}
          height={2000}
          className='w-24 md:w-48'
        />
        <h1 className='text-2xl md:text-6xl font-bold text-yellow-300'>
          WAW KERANJANG KUNING
        </h1>
      </div>

      <br />
      <br />
      <br />

      <div className=''>
        <h2 className='text-2xl md:text-4xl font-bold mb-4'>Nama Pelanggan</h2>
        <div className='ml-0.5 space-y-2'>
          <Input
            onChange={(e) => setName(e.target.value)}
            id='nama'
            placeholder='Masukkan Nama Kamu'
            className='w-fit'
          />
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* Makanan */}
      <div>
        <h2 className='text-2xl md:text-4xl font-bold mb-4'>Makanan</h2>
        <FoodCard data={kentang} onAdd={addToCart} />
      </div>

      <br />
      <br />
      <br />

      {/* Minuman */}
      <div>
        <h2 className='text-2xl md:text-4xl font-bold mb-4'>Minuman</h2>
        <div className='grid grid-cols-1 place-content-center md:grid-cols-[repeat(auto-fit,_290px)] gap-4'>
          {drinks.map((drink, i) => (
            <FoodCard key={i} data={drink} onAdd={addToCart} />
          ))}
        </div>
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <Card className='w-[calc(100%_-_40px)] md:w-96 border-t pt-4 fixed right-5 top-5'>
          <CardHeader>
            <h2 className='text-xl font-semibold'>Daftar Pesanan</h2>
          </CardHeader>
          <CardContent className='h-28 md:h-56 overflow-y-scroll'>
            {cart.map((item, i) => (
              <div key={i} className='flex flex-col border-b py-2'>
                <div className='flex items-center justify-between'>
                  <span>{item.nama}</span>
                  <div className='flex items-center gap-2'>
                    <Button size='sm' onClick={() => updateQty(i, -1)}>
                      -
                    </Button>
                    <span>{item.qty}</span>
                    <Button size='sm' onClick={() => updateQty(i, 1)}>
                      +
                    </Button>
                  </div>
                </div>

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
          </CardContent>
          <CardFooter className='grid'>
            <p className='mt-4 font-bold'>
              Nama: {name}
              <br />
              Total: Rp
              {Intl.NumberFormat().format(
                cart.reduce((sum, i) => sum + i.totalHarga * i.qty, 0)
              )}
              ,-
            </p>
            <Button className='mt-4 rounded' onClick={handlePayment}>
              Bayar di Tempat
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

type FoodCardProps = {
  data: Food;
  onAdd: (baseItem: Food, selectedOptions: OpsiTambahan[]) => void;
};

// Komponen untuk card makanan/minuman
function FoodCard({ data, onAdd }: FoodCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<OpsiTambahan[]>([]);

  function toggleOption(option: OpsiTambahan) {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  }

  return (
    <Card className='w-full md:w-fit'>
      <CardHeader >
        <Image
          src={data.image}
          alt={data.nama}
          width={2000}
          height={2000}
          className='w-72 max-h-42 rounded object-contain m-auto'
        />
      </CardHeader>
      <CardContent>
        <CardTitle className='text-xl'>{data.nama}</CardTitle>
        <CardDescription>Harga: Rp{data.harga}</CardDescription>

        {/* Opsi Tambahan */}
        {data.opsiTambahan.length > 0 && (
          <div className='mt-4 space-y-1'>
            <p className='font-medium'>Opsi Tambahan</p>
            {data.opsiTambahan.map((opsi, i) => (
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
      </CardContent>
      <CardFooter className='grid md:block'>
        <Button
          className='mt-4 rounded'
          onClick={() => onAdd(data, selectedOptions)}
        >
          Tambah ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
}
