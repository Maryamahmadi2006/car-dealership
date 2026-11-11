import PageHero from '../components/PageHero';
import StepsSection from '../components/StepsSection';
import WhyUsSection from '../components/WhyUsSection';
import FormSection from '../components/FormSection';
import FaqSection from '../components/FaqSection';
import {
  tradeInHero,
  tradeInSteps,
  tradeInWhyUs,
  tradeInForm,
  tradeInFaq,
} from '../data/site';

export default function TradeIn() {
  return (
    <>
      <PageHero data={tradeInHero} />
      <StepsSection data={tradeInSteps} />
      <WhyUsSection data={tradeInWhyUs} />
      <FormSection data={tradeInForm} id="form" />
      <FaqSection data={tradeInFaq} />
    </>
  );
}
