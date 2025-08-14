import { OpsiTambahan } from './opsi-tambahan';

export type Food = {
  nama: string;
  harga: number;
  opsiTambahan: OpsiTambahan[];
  image: string;
};
