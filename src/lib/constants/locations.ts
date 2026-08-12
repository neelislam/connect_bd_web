export const bangladeshLocations: Record<string, string[]> = {
  Dhaka: [
    'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj',
    'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi',
    'Rajbari', 'Shariatpur', 'Tangail',
  ],
  Chittagong: [
    'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Comilla',
    "Cox's Bazar", 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati',
  ],
  Rajshahi: [
    'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Rajshahi', 'Sirajganj',
  ],
  Khulna: [
    'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira',
  ],
  Barishal: [
    'Barguna', 'Barishal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
  ],
  Sylhet: [
    'Habiganj', 'Maulvibazar', 'Sunamganj', 'Sylhet',
  ],
  Rangpur: [
    'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon',
  ],
  Mymensingh: [
    'Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur',
  ],
};

export const divisions = Object.keys(bangladeshLocations);
export const allDistricts = Object.values(bangladeshLocations).flat();