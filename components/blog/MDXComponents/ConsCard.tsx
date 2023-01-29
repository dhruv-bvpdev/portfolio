import { XCircle } from 'lucide-react'

type Props = {
  title: string
  cons: string[]
}

export default function ConsCard({ title, cons }: Props) {
  return (
    <div className="w-full p-6 my-6 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900 rounded-xl">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map(con => (
          <div key={con} className="flex items-baseline mb-2 font-medium">
            <div className="w-4 h-4 mr-2">
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
