import { useEffect, useState } from "react";
import separate from "@/utils/separator";

export default function Home({ data }) {
  const { usdPrice, dateObj } = data;
  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (currency === 'usd') {
      const usdCalc = amount * usdPrice;
      setResult(usdCalc)
    } else {
      const irrCalc = Math.round(amount / usdPrice);
      setResult(irrCalc)
    }
  }, [currency, amount])

  return (
    <main>
      {dateObj && (
        <>
          {/* Start Header  */}
          <div id="header">
            <h2>برنامه تبدیل دلار به تومان</h2>
            <div>
              <span>آخرین بروزرسانی: </span>
              <span id="last">{`${dateObj.year}/${dateObj.month}/${dateObj.day}`}</span>
            </div>
          </div>
          {/* End of Header  */}
          {/* Start Form */}
          <div id="form">
            <div className="form-group">
              <label htmlFor="currencies">لطفا ارز خود را انتخاب کنید</label>
              <select name="currencies" id="currencies" value={currency} onChange={event => setCurrency(event.target.value)}>
                <option value="irr">ریال</option>
                <option value="usd">دلار</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">مبلغ مورد نظر را وارد کنید</label>
              <input type="number" name="amount" id="amount" value={amount} onChange={event => setAmount(event.target.value)} min={1} />
            </div>
          </div>
          {/* End of Form */}
          {/* Start Result  */}
          <div id="result" className="value">
            <div id="paid">
              <h4>در ازای پرداخت:</h4>
              <span>{separate(amount)}</span>
              <span>
                {currency === 'usd' ? "دلار" : "ریال"}
              </span>
            </div>
            <div id="received" className="value">
              <span>{separate(result)}</span>
              <span>
                {currency === 'usd' ? "ریال" : "دلار"}
              </span>
              <h4>دریافت می کنید</h4>
            </div>
          </div>
          {/* End of Result  */}
        </>
      )}

      {!dateObj && (
        <h1>دیتا از api دریافت نشد لطفا صفحه را رفرش کنید !</h1>
      )}
    </main>
  );
}


export async function getStaticProps() {
  try {
    const res = await fetch(`https://api.navasan.tech/latest/?api_key=freemI6J1T4dRkeMIiskGU2RwazBRAHY`);
    const resJson = await res.json();
    const usdInfo = resJson.usd_sell

    // Change toman to Rial
    const usdPrice = usdInfo.value + 0;

    const dateObj = {
      year: usdInfo.date.slice(0, 4),
      month: usdInfo.date.slice(5, 7),
      day: usdInfo.date.slice(8, 10),
    }

    return {
      props: {
        data: {
          dateObj,
          usdPrice
        }
      },
      revalidate: 3600 // 1H
    }

  } catch (error) {
    console.log(error);
    return {
      props: {
        data: {}
      },
      revalidate: 3600 // 1H
    }
  }




}