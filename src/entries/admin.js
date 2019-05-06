import main from '../main'
import router from '@/routers/admin'
import ProtectedPortal from '@/utils/protected-portal'
/**
 * Mouting the APP
 */

ProtectedPortal('admin-layout', router, main);