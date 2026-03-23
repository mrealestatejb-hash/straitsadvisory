'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

interface MortgageCalculatorProps {
  defaultPrice?: number;
}

function calculateStampDuty(price: number): number {
  let duty = 0;
  if (price > 1000000) {
    duty += (price - 1000000) * 0.04;
    price = 1000000;
  }
  if (price > 500000) {
    duty += (price - 500000) * 0.03;
    price = 500000;
  }
  if (price > 100000) {
    duty += (price - 100000) * 0.02;
    price = 100000;
  }
  duty += price * 0.01;
  return Math.round(duty);
}

function calculateLegalFees(price: number): number {
  let fees = 350; // base fee
  const remaining = price;
  if (remaining > 1000000) {
    fees += (remaining - 1000000) * 0.005;
  }
  if (remaining > 500000) {
    fees += Math.min(remaining - 500000, 500000) * 0.008;
  }
  fees += Math.min(remaining, 500000) * 0.01;
  return Math.round(fees);
}

export function MortgageCalculator({ defaultPrice = 400000 }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [tenure, setTenure] = useState(30);
  const [rate, setRate] = useState(4.5);

  const results = useMemo(() => {
    const downPayment = Math.round(price * (downPaymentPct / 100));
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = tenure * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0 && numPayments > 0) {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const stampDuty = calculateStampDuty(price);
    const legalFees = calculateLegalFees(price);
    const totalUpfront = downPayment + stampDuty + legalFees;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      downPayment,
      stampDuty,
      legalFees,
      totalUpfront,
    };
  }, [price, downPaymentPct, tenure, rate]);

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-xl font-extrabold text-foreground mb-5 flex items-center gap-2">
        <Calculator className="w-5 h-5" />
        Mortgage Calculator
      </h2>

      {/* Input grid */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Property Price (RM)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 border border-input rounded-lg text-sm font-medium text-foreground focus:outline-none focus:border-[#c9a962] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Down Payment (%)
          </label>
          <input
            type="number"
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value) || 0)}
            min={0}
            max={100}
            className="w-full px-3.5 py-2.5 border border-input rounded-lg text-sm font-medium text-foreground focus:outline-none focus:border-[#c9a962] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Loan Tenure (Years)
          </label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value) || 0)}
            min={1}
            max={35}
            className="w-full px-3.5 py-2.5 border border-input rounded-lg text-sm font-medium text-foreground focus:outline-none focus:border-[#c9a962] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            step={0.1}
            min={0}
            className="w-full px-3.5 py-2.5 border border-input rounded-lg text-sm font-medium text-foreground focus:outline-none focus:border-[#c9a962] transition-colors"
          />
        </div>
      </div>

      {/* Monthly payment result */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center mb-4">
        <div className="text-[13px] text-muted-foreground mb-1">Estimated Monthly Payment</div>
        <div className="text-[32px] font-extrabold text-emerald-600">
          RM{results.monthlyPayment.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground mt-1">per month</div>
      </div>

      {/* Upfront costs breakdown */}
      <div className="mt-4">
        <h4 className="text-sm font-bold text-foreground mb-2.5">Upfront Costs Breakdown</h4>
        <div className="flex justify-between py-2 text-[13px] border-b border-border">
          <span className="text-muted-foreground">Down Payment ({downPaymentPct}%)</span>
          <span>RM{results.downPayment.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 text-[13px] border-b border-border">
          <span className="text-muted-foreground">Stamp Duty</span>
          <span>RM{results.stampDuty.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 text-[13px] border-b border-border">
          <span className="text-muted-foreground">Legal Fees (est.)</span>
          <span>RM{results.legalFees.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-3 text-[13px] font-bold text-foreground border-t-2 border-border mt-0">
          <span>Total Upfront</span>
          <span>RM{results.totalUpfront.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
