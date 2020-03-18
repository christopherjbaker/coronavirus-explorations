import average from '../helpers/weighted-arithmetic-mean'

const data = [
  {
    weight: 0.25,
    lower: 13.1,
    upper: 17.7,
    mean: 15.2,

    country: 'China',
    dateStart: '12/31/19',
    dateEnd: '1/24/20',
    datePublished: '2/17/20',
    reviewed: false,
    source: { label: 'Hokkaido University', url: 'http://medrxiv.org/content/early/2020/02/02/2020.01.29.20019547.abstract' },
  },
  {
    weight: 0.25,
    lower: 18,
    upper: 82,
    mean: 22.3,

    country: 'China',
    dateStart: '12/31/19',
    dateEnd: '1/21/20',
    datePublished: '2/10/20',
    reviewed: false,
    source: { label: 'Imperial College London', url: 'https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/Imperial-College-2019-nCoV-severity-10-02-2020.pdf' },
  },
  {
    weight: 0.25,
    lower: 16,
    upper: 21,
    mean: 18,

    country: 'China',
    dateStart: '12/10/19',
    dateEnd: '1/27/20',
    datePublished: '2/4/20',
    reviewed: false,
    source: { label: 'IDM', url: 'https://institutefordiseasemodeling.github.io/nCoV-public/analyses/first_adjusted_mortality_estimates_and_risk_assessment/2019-nCoV-preliminary_age_and_time_adjusted_mortality_rates_and_pandemic_risk_assessment.html' },
  },
  {
    weight: 0.25,
    lower: 11.8,
    upper: 16,
    mean: 13.8,

    country: 'China',
    dateStart: '12/31/19',
    dateEnd: '1/25/20',
    datePublished: '1/28/20',
    reviewed: false,
    source: { label: 'Hokkaido University', url: 'https://institutefordiseasemodeling.github.io/nCoV-public/analyses/first_adjusted_mortality_estimates_and_risk_assessment/2019-nCoV-preliminary_age_and_time_adjusted_mortality_rates_and_pandemic_risk_assessment.html' },
  },
]

export default function useTimeToDeath() {
  return average(data, 'mean')
}
