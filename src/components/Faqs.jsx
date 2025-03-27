import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'How accurate is the Meal Scan feature?',
      answer:
        'Meal Scan uses advanced AI to estimate macros based on visual input. While it’s highly accurate for most meals, we recommend reviewing the results for complex or mixed dishes.',
    },
    {
      question: 'Can I create and save custom meals?',
      answer:
        'Yes. You can build your own meals by combining ingredients and save them for quick access later. This is great for recurring meals or meal prepping.',
    },
    {
      question: 'What if the barcode doesn’t scan?',
      answer:
        'If the barcode doesn’t scan, try adjusting the lighting or camera angle. You can also search for the item manually or enter it using the nutrition label scan.',
    },
  ],
  [
    {
      question: 'Is my data private and secure?',
      answer:
        'Absolutely. All your data is encrypted and stored securely. We do not share or sell your personal food or nutrition data.',
    },
    {
      question:
        'Does Cal-Pal AI support specific diets like keto, vegan, or gluten-free?',
      answer:
        'Yes. Cal-Pal AI is flexible and supports a variety of dietary preferences and goals. You can track macros according to your personal nutrition plan.',
    },
    {
      question: 'Can I track portion sizes without a food scale?',
      answer:
        'Yes. Cal-Pal AI estimates portion sizes based on visual recognition and common measurements, making it easier to log without a scale.',
    },
  ],
  [
    {
      question: 'Do I need to log everything I eat?',
      answer:
        'For best results, we recommend logging all meals and snacks. Cal-Pal makes it easy with recent items, saved meals, and multiple input options like scanning and searching.',
    },
    {
      question: 'How is Cal-Pal AI different from other tracking apps?',
      answer:
        'Cal-Pal AI uses advanced image and text recognition to make tracking faster and more intuitive. You can scan meals, barcodes, or nutrition labels — no manual entry required.',
    },
    {
      question: 'Is Cal-Pal AI suitable for beginners?',
      answer:
        'Yes. Whether you’re new to macro tracking or experienced, Cal-Pal AI is designed to be simple, efficient, and easy to use from day one.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
