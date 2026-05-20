interface Props {
  name: string
  size?: number
  className?: string
}

export default function MIcon({ name, size = 20, className = '' }: Props) {
  return (
    <span
      className={`material-symbols-rounded leading-none ${className}`}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  )
}
