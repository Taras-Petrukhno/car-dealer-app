import Link from 'next/link';

export async function generateStaticParams() {
  let makeIds = null;
  let years = null;
  const APIBase = process.env.NEXT_PUBLIC_API_BASE;
  const response = await fetch(`${APIBase}/vehicles/GetMakesForVehicleType/car?format=json`, {
    cache: 'force-cache',
  });
  if (response.ok) makeIds = (await response.json()).Results.map((vehicle) => vehicle.MakeId);

  const createModelYearsContent = () => {
    const content = [];
    for (let i = new Date().getFullYear(); i >= 2015; i--) content.push(i);
    return content;
  };
  years = createModelYearsContent();

  const paths = makeIds.flatMap((makeId) =>
    years.map((year) => ({
      makeId: String(makeId),
      year: String(year),
    })),
  );

  return paths;
}

export default async function Result({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const APIBase = process.env.NEXT_PUBLIC_API_BASE;
  const makeId = (await params).makeId;
  const year = (await params).year;
  const response = await fetch(
    `${APIBase}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    {
      cache: 'force-cache',
    },
  );
  if (!response.ok) throw Error("API Doesn't work");
  const vehicles = (await response.json()).Results;
  return (
    <main className="flex flex-col items-center">
      <p className="mb-7 mt-10 font-semibold">Selected: {year} year</p>
      <ul className="mb-5 list-disc pl-5">
        {vehicles.map((vehicle) => (
          <li className="mb-2" key={vehicle.Make_ID + vehicle.Model_ID}>
            {vehicle.Make_Name} {vehicle.Model_Name}
          </li>
        ))}
      </ul>
      <Link className="rounded-xl bg-teal-900 px-12 py-3 text-white" href="/">
        Find next car
      </Link>
    </main>
  );
}
