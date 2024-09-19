import { Notify } from 'quasar'

export default function useNotify () {
  function danger (message, position = 'top') {
    return Notify.create({ message, color: 'negative', position, icon: 'error_outline' })
  }

  function warning (message, position = 'top') {
    return Notify.create({ message, color: 'warning', position, icon: 'report_problem' })
  }

  function success (message, position = 'top') {
    return Notify.create({ message, color: 'green-9', position, icon: 'done_outline' })
  }

  return { danger, warning, success }
}
