import { meanArithmetic } from '../helpers/means'

const data = [
  {
    weight: 2,
    mean: 3.64423,

    reviewed: false,
    source: {
      label: 'Tomas Pueyo',
      url: 'https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca',
    },
  },

  {
    weight: 4,
    lower: 6.26,
    upper: 9.66,
    mean: 7.31,

    dateStart: '12/31/19',
    dateEnd: '1/23/20',
    datePublished: '2/13/20',
    reviewed: true,
    source: {
      label: 'University of Texas at Austin',
      url: 'https://github.com/midas-network/COVID-19/tree/master/parameter_estimates/2019_novel_coronavirus',
    },
  },
  {
    weight: 4,
    lower: 5.8,
    upper: 7.1,
    mean: 6.4,

    dateStart: '12/31/19',
    dateEnd: '1/28/20',
    datePublished: '1/31/20',
    reviewed: true,
    source: {
      label: 'University of Hong Kong',
      url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30260-9/fulltext',
    },
  },

  {
    weight: 1,
    lower: 4.2,
    upper: 5.1,
    mean: 4.6,

    dateStart: '12/1/19',
    dateEnd: '2/7/20',
    datePublished: '2/11/20',
    reviewed: false,
    source: {
      label: 'Mobs-lab',
      url: 'https://www.medrxiv.org/content/10.1101/2020.02.09.20021261v1',
    },
  },
  {
    weight: 1,
    mean: 2.4,

    dateStart: '1/20/20',
    dateEnd: '2/2/20',
    datePublished: '2/6/20',
    reviewed: false,
    source: {
      label: 'Georgia Southern University',
      url: 'https://www.medrxiv.org/content/medrxiv/early/2020/02/06/2020.02.05.20020750.full.pdf',
    },
  },
]

export default function useTimeToDouble() {
  return meanArithmetic(data, 'mean')
}
