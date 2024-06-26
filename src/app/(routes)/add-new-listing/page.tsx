// pages/add-new-listing.tsx
'use client'
// pages/add-new-listing.tsx
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import GoogleSearch from '@/app/_components/googlesearch'; // Import the GoogleSearch component
import { supabase } from '@/lib/client'; // Import the 'supabase' module
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

function AddNewListingPage() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();

  const nextHandler = async () => {
    console.log(selectedAddress, coordinates);

    const { data, error } = await supabase
      .from('Waste')
      .insert([
        {
          Location: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        },
      ])
      .select();

    if (data) {
      console.log('Data Inserted Successfully', data);
      toast.success('Location Added Successfully');
    }
    if (error) {
      console.log('Error Inserting Data', error);
      toast.error('Error Adding Location');
    }
  };

  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
    <div className=' p-10 flex flex-col  gap-5 items-center justify-center '>
        <h1 className='font-bold text-2xl'>Add New Listing Page</h1>
    
        <div className='p-10 px-28 rounded-lg border w-full shadow-md flex flex-col gap-5'>
                <h2 className='font-gray-500 text-center'>Enter The Location To Mark  </h2>
                <GoogleSearch 
                selectedAddress={(value: any)=>setSelectedAddress(value)} 
                setCoodinates={(value: any)=>setCoordinates(value)} />
                
                <Button 
                    disabled={!selectedAddress || !coordinates}
                    onClick={nextHandler}
                    className='bg-gray-900 text-white p-2 rounded-md'>
                    Submit</Button>
        </div>
    
    </div>
     </div>
  );
}

export default AddNewListingPage;
