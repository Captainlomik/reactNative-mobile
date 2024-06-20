import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export function Notification() {
    const router = useRouter()

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowAlert: true
        })
    })

    useEffect(() => {
        const subRecived = Notifications.addNotificationReceivedListener((notification) => {
        })
        const subResponseRecived = Notifications.addNotificationResponseReceivedListener((notification) => {
            const alias = notification.notification.request.content.data.alias
            router.push(`/(app)/course/${alias}`)
        })
        return () => {
            subRecived.remove()
            subResponseRecived.remove()
        }
    }, [])

    return <></>
}