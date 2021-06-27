const handlePeriod = (period, dateString, month) => {
  if (month === 0) {
    const currentDate = new Date(dateString);
    period.push(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`
    );
  } else {
    const pre = new Date(dateString);
    let month = pre.getMonth() + 2,
      year = pre.getFullYear(),
      date = pre.getDate();
    if (month > 12) {
      month = 1;
      year += 1;
    }
    const currentDate = new Date(`${year}-${month}-${date}`);
    period.push(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`
    );
  }
  return period[month];
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  document.querySelector("table tbody").innerHTML = "";
  const loan = Number(document.querySelector("#loan").value);
  const months = Number(document.querySelector("#months").value);
  const rate = Number(document.querySelector("#rate").value);
  const disDate = document.querySelector("#disbursementDate").value;

  const interest = Math.round((loan * months * rate) / 1200);
  const total = loan + interest;

  document.querySelector("#interest").value = interest;
  document.querySelector("#total").value = total;
  const period = [];
  for (let i = 0; i <= months; i++) {
    let html;
    if (i === 0) {
      html = `
        <td>${i}</td>
        <td>${handlePeriod(period, disDate, i)}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      `;
    } else if (i === months) {
      const loanPerMonths = loan - Math.round((loan / months) * (months - 1));
      console.log(Math.round((loan / months) * (months - 1)));
      const interestPerMonths =
        interest - Math.round(((loan * rate) / 1200) * (months - 1));
      const totalPerMonths = loanPerMonths + interestPerMonths;
      html = `
      <td>${i}</td>
      <td>${handlePeriod(period, period[i - 1], i)}</td>
      <td>${loanPerMonths.toLocaleString()}$</td>
      <td>${interestPerMonths.toLocaleString()}$</td>
      <td>${totalPerMonths.toLocaleString()}$</td>
      <td>0</td>
      `;
    } else {
      const loanPerMonths = Math.round(loan / months);
      const interestPerMonths = Math.round((loan * rate) / 1200);
      const totalPerMonths = loanPerMonths + interestPerMonths;
      const remaining = loan - loanPerMonths * i;
      html = `
      <td>${i}</td>
      <td>${handlePeriod(period, period[i - 1], i)}</td>
      <td>${loanPerMonths.toLocaleString()}$</td>
      <td>${interestPerMonths.toLocaleString()}$</td>
      <td>${totalPerMonths.toLocaleString()}$</td>
      <td>${remaining.toLocaleString()}$</td>
      `;
    }
    const tr = document.createElement("tr");
    tr.innerHTML = html;
    document.querySelector("table tbody").append(tr);
  }
});
