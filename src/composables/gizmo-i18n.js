import { useI18n } from 'vue-i18n'

export function useGizmoI18n() {
  const { t, tm } = useI18n()
  function getGizmoByKey(gizmoKey) {
    const categories = tm('gizmos.categories', { returnObjects: true }) || []
    return categories.flatMap(cat => cat.items).find(item => item.gizmo === gizmoKey)
  }
  function getGizmoTitle(gizmoKey) {
    return getGizmoByKey(gizmoKey)?.title
  }
  function getGizmoDescription(gizmoKey) {
    return getGizmoByKey(gizmoKey)?.description
  }
  return { getGizmoByKey, getGizmoTitle, getGizmoDescription }
}