import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export const NotFound: React.FC = () => {
  const router = useRouter()

  return (
    <article className="py-12 text-center">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        Funcionário não encontrado
      </h3>
      <p className="mb-4 text-gray-600">
        O funcionário solicitado não existe ou foi removido
      </p>

      <Button
        className="bg-beuni-orange hover:bg-beuni-orange/90"
        onClick={() => router.push('/employees')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para lista
      </Button>
    </article>
  )
}
