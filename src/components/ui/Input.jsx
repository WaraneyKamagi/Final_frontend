const classNames = (...classes) => classes.filter(Boolean).join(' ')

const Input = ({
  label,
  helperText,
  className = '',
  inputClassName = '',
  ...props
}) => {
  const wrapperClass = classNames('flex flex-col gap-2 text-sm text-slate-200', className)
  const fieldClass = classNames(
    'rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500',
    inputClassName,
  )

  return (
    <label className={wrapperClass}>
      {label && <span className="font-medium text-slate-100">{label}</span>}
      <input className={fieldClass} {...props} />
      {helperText && <span className="text-xs text-slate-500">{helperText}</span>}
    </label>
  )
}

export default Input

