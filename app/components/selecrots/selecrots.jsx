import Dropdown from '../dropdown/dropdown';
import { useState, useEffect } from 'react';

export default function Selectors({ selectors, setSelectors, className }) {
  const [vehicles, setVehicles] = useState([]);
  const [years, setYears] = useState([]);
  const APIBase = process.env.NEXT_PUBLIC_API_BASE;
  //data
  useEffect(() => {
    async function fetchVehicles() {
      let response = await fetch(`${APIBase}/vehicles/GetMakesForVehicleType/car?format=json`);
      let data = await response.json();
      setVehicles(data.Results);
    }
    fetchVehicles();

    const createModelYearsContent = () => {
      let content = [];
      for (let i = new Date().getFullYear(); i >= 2015; i--) content.push({ year: i });
      return content;
    };
    setYears(createModelYearsContent());
  }, []);

  //All selected
  useEffect(() => {
    if (
      !(selectors?.MakeId == undefined || selectors?.year == undefined) &&
      selectors?.allSelected !== true
    ) {
      setSelectors((prev) => ({
        ...prev,
        allSelected: true,
      }));
    }
    if (
      (selectors?.MakeId == undefined || selectors?.year == undefined) &&
      selectors?.allSelected !== false
    ) {
      setSelectors((prev) => ({
        ...prev,
        allSelected: false,
      }));
    }
  }, [selectors]);

  return (
    <section className={className}>
      <Dropdown
        content={vehicles}
        contentProp="MakeName"
        keyProp="MakeId"
        title="All Vehicle Makes"
        setFunc={setSelectors}
        setProp="MakeId"
      />
      <Dropdown
        content={years}
        contentProp="year"
        keyProp="year"
        title="Model years"
        setFunc={setSelectors}
        setProp="year"
      />
    </section>
  );
}
