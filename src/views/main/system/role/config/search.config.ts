import { IForm } from '@/base-ui/form/types'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'role',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '权限名称',
      placeholder: '请输入用户名'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
