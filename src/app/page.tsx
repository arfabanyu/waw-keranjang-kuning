import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import kentang from './makanan.json';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader title='Dashboard' />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 p-4 md:gap-6 md:py-6'>
              <form action='' className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Nama</Label>
                  <Input className='w-fit' placeholder='Masukkan Nama Kamu' />
                </div>
                <div className='space-y-2'>
                  <h1 className='text-2xl uppercase font-semibold'>Makanan</h1>
                  <Card className='flex flex-row gap-0 w-fit'>
                    <CardHeader className='w-96'>
                      <Image
                        src={kentang.image}
                        alt='kentang'
                        width={2000}
                        height={2000}
                        className='w-96 rounded'
                      />
                    </CardHeader>
                    <CardContent className='pl-0'>
                      <div>
                        <CardTitle className='text-2xl capitalize'>
                          {kentang.nama}
                        </CardTitle>
                        <CardDescription className='text-lg'>
                          Harga: Rp{kentang.harga},-
                        </CardDescription>
                      </div>
                      <div className='pt-4 space-y-2'>
                        <CardTitle>Opsi Tambahan</CardTitle>
                        <div>
                          {kentang.opsi_tambahan.map((opsi, i) => {
                            return (
                              <Label key={i}>
                                <Checkbox />
                                <CardDescription className='text-lg'>
                                  {opsi.nama}
                                </CardDescription>
                              </Label>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className='space-y-2'>
                  {}
                </div>
              </form>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
