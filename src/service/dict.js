/**
 * 数据字典配置服务
 */
export default {

  // 审核状态：0 未审核 1审核通过  2审核中 3审核失败
  getStatus(status) {
    return {
      '0': { text: '未审核', class: ' color-black' },
      '1': { text: '审核通过', class: ' color-black' },
      '2': { text: '审核中', class: ' color-blue' },
    }[status] || {}
  },
}