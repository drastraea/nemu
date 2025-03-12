import {
  CheckCircleIcon,
  FileUpload,
  ScanSearch,
  SparklingIcon,
} from '@/components/ui/icons'

export const FlowSection = () => {
  const flowItem = [
    {
      icon: <FileUpload />,
      title: 'Upload Details',
      description:
        'Submit information and photos about your lost or found item',
    },
    {
      icon: <ScanSearch />,
      title: 'AI-Powered Tagging',
      description: 'AI extracts key details from images to auto-tag items',
    },
    {
      icon: <SparklingIcon />,
      title: 'AI Matching',
      description:
        'Our AI analyzes item, category, timeframe, location, tag and images to find potential matches with up to 80% accuracy.',
    },
    {
      icon: <CheckCircleIcon />,
      title: 'Get Connected',
      description: 'Receive notifications when potential matches are found',
    },
  ]

  return (
    <section className="py-20 bg-black text-white">
      <div className="container px-6 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">How Nemu Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {flowItem.map((item, index) => {
            return (
              <div
                key={index}
                className="text-center p-6 cursor-pointer transition-all duration-300 hover:bg-white/5 rounded-lg"
              >
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
