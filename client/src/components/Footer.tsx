import { Box, Card, Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <>
      <Stack sx={{ backgroundColor: '#551a8b', padding: 2, clear: 'both', marginTop: 2, color: 'white', fontWeight: 'bold' }}>
        <Card component="div" color="black" sx={{ marginBottom: 2, fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, backgroundColor: '#551a8b',color: 'white'}}>
            <p>Chính sách bảo mật</p>
            <p>Quy chế hoạt động</p>
            <p>Chính sách vận chuyển</p>
            <p>Chính sách trả hàng và hoàn tiền</p>
          </Card>
          <Box sx={{ textAlign: 'center' }}>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn <br/>
                Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn <br />
                Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015 <br />
                © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
          </Box>
        </Stack>
    </>
  )
}

export default Footer