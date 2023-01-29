import { CheckCircle } from 'lucide-react'

type Props = {
  title: string
  pros: string[]
}

export default function ProsCard({ title, pros }: Props) {
  return (
    <div className="w-full p-6 my-4 border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900 rounded-xl">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map(pro => (
          <div key={pro} className="flex items-baseline mb-2 font-medium">
            <div className="w-4 h-4 mr-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
