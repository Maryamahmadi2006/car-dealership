import PageHero from '../components/PageHero';
import StepsSection from '../components/StepsSection';
import WhyUsSection from '../components/WhyUsSection';
import FormSection from '../components/FormSection';
import FaqSection from '../components/FaqSection';
import {
  financingHero,
  financingSteps,
  financingWhyUs,
  financingForm,
  financingFaq,
} from '../data/site';

export default function Financing() {
  return (
    <>
      <PageHero data={financingHero} />
      <StepsSection data={financingSteps} />
      <WhyUsSection data={financingWhyUs} />
      <FormSection data={financingForm} id="form" />
      <FaqSection data={financingFaq} />
    </>
  );
}
