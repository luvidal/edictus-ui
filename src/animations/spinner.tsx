import { useId } from 'react'

type Size = 'xs' | 'sm' | 'md' | 'lg'

interface SpinnerProps {
  size?: Size
  message?: string
}

const sizeConfig = {
  xs: { spinner: 20, stroke: 2, text: 'text-xs' },
  sm: { spinner: 28, stroke: 2.5, text: 'text-sm' },
  md: { spinner: 36, stroke: 3, text: 'text-base' },
  lg: { spinner: 48, stroke: 3.5, text: 'text-lg' },
}

export default function Spinner({ size = 'sm', message }: SpinnerProps) {
  const id = useId().replace(/:/g, '')
  const cfg = sizeConfig[size]

  return (
    <>
      <style>{`
        @keyframes loading-spin-${id} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loading-dash-${id} {
          0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
        }
        .loading-spinner-${id} {
          animation: loading-spin-${id} 1.5s linear infinite;
        }
        .loading-dash-${id} {
          animation: loading-dash-${id} 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className='flex flex-col items-center justify-center gap-3'>
          <svg
            className={`loading-spinner-${id} drop-shadow-sm`}
            viewBox='0 0 50 50'
            style={{ width: cfg.spinner, height: cfg.spinner }}
          >
            <circle
              cx='25'
              cy='25'
              r='20'
              fill='none'
              stroke='currentColor'
              strokeWidth={cfg.stroke}
              className='text-theme-100'
            />
            <circle
              cx='25'
              cy='25'
              r='20'
              fill='none'
              stroke='currentColor'
              strokeWidth={cfg.stroke}
              strokeLinecap='round'
              className={`text-theme-500 loading-dash-${id}`}
            />
          </svg>

          {message && (
            <span className={`${cfg.text} text-theme-600 font-medium`}>{message}</span>
          )}
      </div>
    </>
  )
}
