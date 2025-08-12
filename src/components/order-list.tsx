import { CartItem } from '@/types/cart-item';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Dialog, DialogTrigger } from './ui/dialog';

const OrderList = ({
  children,
  cart,
  setCart,
}: {
  children: ReactNode;
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
}) => {
  function handlePayment() {
    alert('Pembayaran berhasil 🎉');
    setCart([]); // reset cart
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <h2 className='text-xl font-semibold'>Daftar Pesanan</h2>
      {cart.map((item, i) => (
        <div key={i} className='flex justify-between'>
          <span>
            {item.nama} x{item.qty}
          </span>
          <span>Rp{item.harga * item.qty}</span>
        </div>
      ))}
      <p className='mt-4 font-bold'>
        Total: Rp{cart.reduce((sum, i) => sum + i.harga * i.qty, 0)}
      </p>
    </Dialog>
  );
};

export default OrderList;
