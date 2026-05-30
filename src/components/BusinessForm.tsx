import React, { useState } from 'react';
import { BusinessInput, BusinessInputSchema } from '../lib/schemas/copy-schema';
import { Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  onSubmit: (data: BusinessInput) => void;
  loading: boolean;
  initialData?: BusinessInput | null;
  compact?: boolean;
}

export default function BusinessForm({ onSubmit, loading, initialData, compact }: Props) {
  const [formData, setFormData] = useState<Partial<BusinessInput>>(initialData || {
    name: '',
    location: '',
    vertical: '',
    services: [],
    uniqueSellingPoints: [],
    targetCustomer: '',
    tone: 'professional',
    city: ''
  });

  const [servicesInput, setServicesInput] = useState(initialData?.services?.join(', ') || '');
  const [uspsInput, setUspsInput] = useState(initialData?.uniqueSellingPoints?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedServices = servicesInput.split(',').map(s => s.trim()).filter(Boolean);
    const parsedUsps = uspsInput.split(',').map(s => s.trim()).filter(Boolean);
    
    const dataToSubmit = {
      ...formData,
      services: parsedServices,
      uniqueSellingPoints: parsedUsps,
    };

    const result = BusinessInputSchema.safeParse(dataToSubmit);
    if (result.success) {
      onSubmit(result.data);
    } else {
      alert("Please check your inputs and make sure all fields are filled.");
    }
  };

  const inputStyles = "bg-[#F2F4F8] dark:bg-[#1A1C1E] border p-2 rounded text-xs text-[#1A1C1E] dark:text-[#F1F3F5] focus:outline-none w-full mt-1.5 transition-colors placeholder:text-[#878D96] dark:placeholder:text-[#697077]";
  const labelStyles = "text-[10px] font-bold text-[#343A3F] dark:text-[#DDE1E6] uppercase tracking-wider transition-colors flex justify-between";

  const getValidationClass = (isValid: boolean, hasValue: boolean) => {
    if (!hasValue) return "border-[#DDE1E6] dark:border-[#343A3F] focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC]";
    return isValid 
      ? "border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500" 
      : "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500";
  };

  const isNameValid = formData.name ? formData.name.length >= 2 : false;
  const isVerticalValid = formData.vertical ? formData.vertical.length >= 2 : false;
  const isLocationValid = formData.location ? formData.location.length >= 2 : false;
  const isCityValid = formData.city ? formData.city.length >= 2 : false;
  const isServicesValid = servicesInput.split(',').map(s => s.trim()).filter(Boolean).length >= 1;
  const isUspsValid = uspsInput.split(',').map(s => s.trim()).filter(Boolean).length >= 1;
  const isTargetCustomerValid = formData.targetCustomer ? formData.targetCustomer.length >= 5 : false;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-1")}>
        <div className="flex flex-col">
          <label className={labelStyles}>
            Business Name
            {formData.name && (isNameValid ? <span className="text-green-500">✔</span> : <span className="text-red-500">Min 2 chars</span>)}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={cn(inputStyles, getValidationClass(isNameValid, !!formData.name))}
            placeholder="Aura Salon & Spa"
          />
        </div>
        <div className="flex flex-col">
          <label className={labelStyles}>
            Business Vertical
            {formData.vertical && (isVerticalValid ? <span className="text-green-500">✔</span> : <span className="text-red-500">Min 2 chars</span>)}
          </label>
          <input
            type="text"
            required
            value={formData.vertical}
            onChange={(e) => setFormData({ ...formData, vertical: e.target.value })}
            className={cn(inputStyles, getValidationClass(isVerticalValid, !!formData.vertical))}
            placeholder="Salon, Cafe, Clinic"
          />
        </div>
        <div className="flex flex-col">
          <label className={labelStyles}>
            Location
            {formData.location && (isLocationValid ? <span className="text-green-500">✔</span> : <span className="text-red-500">Min 2 chars</span>)}
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={cn(inputStyles, getValidationClass(isLocationValid, !!formData.location))}
            placeholder="Indiranagar"
          />
        </div>
        <div className="flex flex-col">
          <label className={labelStyles}>
            City
            {formData.city && (isCityValid ? <span className="text-green-500">✔</span> : <span className="text-red-500">Min 2 chars</span>)}
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={cn(inputStyles, getValidationClass(isCityValid, !!formData.city))}
            placeholder="Bengaluru"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className={labelStyles}>
          <span>Services <span className="text-[#878D96] dark:text-[#697077] font-normal lowercase tracking-normal">(comma-separated)</span></span>
          {servicesInput && (isServicesValid ? <span className="text-green-500">✔</span> : <span className="text-red-500">Required</span>)}
        </label>
        <textarea
          required
          rows={2}
          value={servicesInput}
          onChange={(e) => setServicesInput(e.target.value)}
          className={cn(inputStyles, getValidationClass(isServicesValid, !!servicesInput))}
          placeholder="Haircut, Facial, Bridal Makeup"
        />
      </div>

      <div className="flex flex-col">
        <label className={labelStyles}>
          <span>Unique Selling Points <span className="text-[#878D96] dark:text-[#697077] font-normal lowercase tracking-normal">(comma-separated)</span></span>
          {uspsInput && (isUspsValid ? <span className="text-green-500">✔</span> : <span className="text-red-500">Required</span>)}
        </label>
        <textarea
          required
          rows={2}
          value={uspsInput}
          onChange={(e) => setUspsInput(e.target.value)}
          className={cn(inputStyles, getValidationClass(isUspsValid, !!uspsInput))}
          placeholder="10 years experience, organic products"
        />
      </div>

      <div className="flex flex-col">
        <label className={labelStyles}>
          Target Customer Persona
          {formData.targetCustomer && (isTargetCustomerValid ? <span className="text-green-500">✔</span> : <span className="text-red-500">Min 5 chars</span>)}
        </label>
        <input
          type="text"
          required
          value={formData.targetCustomer}
          onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
          className={cn(inputStyles, getValidationClass(isTargetCustomerValid, !!formData.targetCustomer))}
          placeholder="Working women aged 22-38"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelStyles}>Tone Setting</label>
        <div className="grid grid-cols-3 gap-2">
          {['friendly', 'professional', 'confident'].map((tone) => (
            <label
              key={tone}
              className={cn(
                "p-2 text-center text-xs uppercase tracking-wider border rounded cursor-pointer transition-colors shadow-sm select-none",
                formData.tone === tone 
                  ? "bg-[#0052CC] border-[#0052CC] text-white font-bold" 
                  : "bg-white dark:bg-[#1A1C1E] border-[#DDE1E6] dark:border-[#343A3F] text-[#697077] dark:text-[#A2A9B0] hover:bg-[#F8F9FA] dark:hover:bg-[#343A3F] font-medium"
              )}
            >
              <input
                type="radio"
                name="tone"
                value={tone}
                checked={formData.tone === tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                className="hidden"
              />
              {tone}
            </label>
          ))}
        </div>
      </div>

      <div className="pt-2 mt-auto">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0052CC] text-white py-2.5 rounded text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#0047b3] transition-colors disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? (
             <span className="flex items-center gap-2">
               <Loader2 className="w-4 h-4 animate-spin" /> GENERATING_JSON...
             </span>
          ) : (
            'REGENERATE COPY MODULE'
          )}
        </button>
      </div>
    </form>
  );
}
