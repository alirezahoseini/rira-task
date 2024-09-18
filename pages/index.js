

export default function Home({data}) {
  const {value: usdPrice, date: lastUpdate } = data
  console.log(usdPrice);
  console.log(lastUpdate);
  return (
    <>
      ff
    </>
  );
}


export async function getStaticProps() {
  // const key = 'freemI6J1T4dRkeMIiskGU2RwazBRAHY'
  // const res = await fetch(`https://api.navasan.tech/latest/?api_key=${key}`);
  // const data = await res.json();
  // console.log(data.usd_sell);

  return {
    props : {
      // data: data.usd_sell
      data: {
        value: '59450',
        change: -200,
        timestamp: 1726647159,
        date: '1403-06-28 12:42:39'
      }
    }
  }
}