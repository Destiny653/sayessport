// components/sections/BookingForm.tsx (keep 'use client' due to form state)
'use client';
import React, { useState } from 'react';
import { Calendar, ChevronDown, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface FormData {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  sports: string;
  sportsClub: string;
  position: string;
  trainingGoals: string;
  preferredTrainingDays: string;
  additionalMessage: string;
}

interface FormErrors {
  fullName?: string;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  sports?: string;
  sportsClub?: string;
  position?: string;
  trainingGoals?: string;
  preferredTrainingDays?: string;
  additionalMessage?: string;
}

interface BookingFormProps {
  packageId: number;
  packageTitle: string;
  dict: any; // Type this better if possible, e.g., import from dictionary type
}

export default function BookingForm({ packageId, packageTitle, dict }: BookingFormProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    sports: '',
    sportsClub: '',
    position: '',
    trainingGoals: '',
    preferredTrainingDays: '',
    additionalMessage: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validate = (): FormErrors => {
    let newErrors: FormErrors = {};
    if (!formData.fullName) newErrors.fullName = dict.full_name_required;
    if (!formData.dateOfBirth) newErrors.dateOfBirth = dict.date_of_birth_required;
    if (!formData.email) {
      newErrors.email = dict.email_required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = dict.email_invalid;
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = dict.phone_number_required;
    if (!formData.sports) newErrors.sports = dict.sports_required;
    if (!formData.trainingGoals) newErrors.trainingGoals = dict.training_goals_required;
    if (!formData.preferredTrainingDays) newErrors.preferredTrainingDays = dict.preferred_training_days_required;
    return newErrors;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear the error for the field once the user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          packageId,
          packageTitle,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          dateOfBirth: '',
          email: '',
          phoneNumber: '',
          sports: '',
          sportsClub: '',
          position: '',
          trainingGoals: '',
          preferredTrainingDays: '',
          additionalMessage: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none';
  const selectClass = 'w-full px-4 py-3 border border-gray-300 rounded-none bg-white appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none';
  const labelClass = 'block mb-2 text-sm font-medium text-gray-700';
  const errorClass = 'mt-1 text-sm text-red-600';

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-5xl bg-white p-4 md:p-8">
         <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#120088] mb-8 font-inter">
          {dict.book_your_session}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className={labelClass}>{dict.full_name}</label>
              <input
                type="text"
                placeholder={dict.full_name_placeholder}
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={inputClass}
              />
              {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
            </div>

            <div>
              <label className={labelClass}>{dict.date_of_birth}</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={`${inputClass} appearance-none`}
                />
                <Calendar className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className={labelClass}>{dict.email}</label>
              <input
                type="email"
                placeholder={dict.email_placeholder}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={inputClass}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div>
              <label className={labelClass}>{dict.phone_number}</label>
              <input
                type="tel"
                placeholder={dict.phone_number_placeholder}
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={inputClass}
              />
              {errors.phoneNumber && <p className={errorClass}>{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className={labelClass}>{dict.sports}</label>
              <div className="relative">
                <select
                  value={formData.sports}
                  onChange={(e) => handleInputChange('sports', e.target.value)}
                  className={selectClass}
                >
                  <option value="">{dict.sports_placeholder}</option>
                  <option value="football">{dict.football}</option>
                  <option value="basketball">{dict.basketball}</option>
                  <option value="tennis">{dict.tennis}</option>
                  <option value="swimming">{dict.swimming}</option>
                  <option value="other">{dict.other}</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 w-6 h-6 text-gray-400 pointer-events-none" />
              </div>
              {errors.sports && <p className={errorClass}>{errors.sports}</p>}
            </div>

            <div>
              <label className={labelClass}>{dict.sports_club}</label>
              <input
                type="text"
                placeholder={dict.sports_club_placeholder}
                value={formData.sportsClub}
                onChange={(e) => handleInputChange('sportsClub', e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{dict.position}</label>
              <input
                type="text"
                placeholder={dict.position_placeholder}
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{dict.training_goals}</label>
              <div className="relative">
                <select
                  value={formData.trainingGoals}
                  onChange={(e) => handleInputChange('trainingGoals', e.target.value)}
                  className={selectClass}
                >
                  <option value="">{dict.training_goals_placeholder}</option>
                  <option value="strength">{dict.strength}</option>
                  <option value="endurance">{dict.endurance}</option>
                  <option value="speed">{dict.speed}</option>
                  <option value="technique">{dict.technique}</option>
                  <option value="other">{dict.other}</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 w-6 h-6 text-gray-400 pointer-events-none" />
              </div>
              {errors.trainingGoals && <p className={errorClass}>{errors.trainingGoals}</p>}
            </div>

            <div>
              <label className={labelClass}>{dict.preferred_training_days}</label>
              <div className="relative">
                <select
                  value={formData.preferredTrainingDays}
                  onChange={(e) => handleInputChange('preferredTrainingDays', e.target.value)}
                  className={selectClass}
                >
                  <option value="">{dict.preferred_training_days_placeholder}</option>
                  <option value="monday">{dict.monday}</option>
                  <option value="tuesday">{dict.tuesday}</option>
                  <option value="wednesday">{dict.wednesday}</option>
                  <option value="thursday">{dict.thursday}</option>
                  <option value="friday">{dict.friday}</option>
                  <option value="saturday">{dict.saturday}</option>
                  <option value="sunday">{dict.sunday}</option>
                  <option value="flexible">{dict.flexible}</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 w-6 h-6 text-gray-400 pointer-events-none" />
              </div>
              {errors.preferredTrainingDays && <p className={errorClass}>{errors.preferredTrainingDays}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>{dict.additional_message}</label>
            <textarea
              placeholder={dict.additional_message_placeholder}
              value={formData.additionalMessage}
              onChange={(e) => handleInputChange('additionalMessage', e.target.value)}
              rows={4}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="flex flex-col gap-3 justify-end md:space-x-4 pt-4 md:flex-row md:gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 border-2 order-2 border-blue-400 text-blue-400 bg-transparent hover:bg-blue-400 hover:text-white transition-colors rounded-none font-bold"
            >
              {dict.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 order-1 bg-blue-400 text-white hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2 rounded-none font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? dict.submitting : dict.submit}</span>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
        {submitStatus === 'success' && (
          <p className="text-center text-green-600 mt-4">
            ✅ {dict.booking_success}
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="text-center text-red-600 mt-4">
            ❌ {dict.booking_error}
          </p>
        )}
      </div>
    </div>
  );
}