import { AxiosError } from 'axios'

import { ToastStore, useToastStore } from '@/app/components/toast/store/toast.store'

import { LocalhostAPI } from '@/library/apis/localhost/localhost.api'
import { PaginationDto, PaginationMeta, PaginationOptions } from '@/library/data/dto/pagination.dto'
import { UpdateUser, UpdateUserDto, UserDto } from '@/library/data/dto/user/user.dto'
import { ModalStore, useModalStore } from '@/app/components/modal/store/modal.store'
import { markRaw } from 'vue'

import UserModal from '../components/user.modal.vue'
import ConfirmModal from '@/app/components/modal/templates/confirm.modal.vue'

class UserService {
  public static async getUsersPaginated(params: PaginationOptions): Promise<PaginationDto<UserDto>> {
    const { addToast }: ToastStore = useToastStore()
    return LocalhostAPI.administration.users.getUsersPaginated(params).catch((error: AxiosError) => {
      addToast({ title: error.response?.statusText || 'ERROR', body: error.message, options: { theme: 'danger' } })
      return { data: [], meta: new PaginationMeta({ pageOptions: params, itemCount: 0 }) }
    })
  }

  public static updateUser(user: UserDto, success?: (value: UserDto) => void): void {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(UserModal),
      properties: {
        user,
        callback: async (values: UpdateUser): Promise<void> => {
          LocalhostAPI.administration.users
            .updateUser(user.id, new UpdateUserDto(values))
            .then((value: UserDto) => {
              if (success) success(value)
              closeModal()
            })
            .catch((error: AxiosError) => {
              addToast({
                title: error.response?.statusText || 'ERROR',
                body: error.message,
                options: { theme: 'danger' }
              })
            })
        }
      }
    })
  }

  public static deleteUser(user: UserDto, success?: (value: UserDto) => void): void {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(ConfirmModal),
      properties: {
        close: closeModal,
        callback: async (): Promise<void> => {
          LocalhostAPI.administration.users
            .deleteUser(user.id)
            .then((value: UserDto) => {
              if (success) success(value)
              closeModal()
            })
            .catch((error: AxiosError) => {
              addToast({
                title: error.response?.statusText || 'ERROR',
                body: error.message,
                options: { theme: 'danger' }
              })
            })
        },
        item: user.getFullName(),
        title: 'administration.users.delete-modal.title',
        body: 'administration.users.delete-modal.body',
        action: 'administration.users.delete-modal.action'
      }
    })
  }
}

export { UserService }
