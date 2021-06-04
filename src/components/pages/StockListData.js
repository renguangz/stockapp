import { PlusSquareOutlined } from "@ant-design/icons"

export const StockListColumns = [
    {
        title: <div><input type="text" placeholder="輸入股票代碼或名稱" /><PlusSquareOutlined /></div>,
        dataIndex: 'actions'
    },
    {
        title: '股票代碼及名稱',
        dataIndex: 'name',

    },
    {
        title: '基本面',
        dataIndex: 'basic',
    },
    {
        title: '籌碼面',
        dataIndex: '籌碼'
    },
    {
        title: '持有',
        dataIndex: '持有'
    },
    // {
    //     title: <EditOutlined />,
    //     dataIndex: '',
    //     render: () => (
    //         <div>
    //             <a>Delete</a>
    //             <br />
    //             <a>Move</a>
    //         </div>
    //     )
    // }
]

export const data = [
    {
        name: '2317',
        basic: '鴻海基本面',
        籌碼: '投信外資',
        持有: '5張',
    },
    {
        name: '1101',
        basic: '台泥基本面',
        籌碼: '投信外資買超',
        持有: '3張',
    },
    {
        name: '2330',
        basic: '台積電基本面',
        籌碼: '投信大買',
        持有: '1張',
    },
    // {
    //     name: <input type="text" placeholder="輸入股票代碼或名稱" />,
    //     basic: '',
    //     籌碼: '',
    //     持有: <input type="text" placeholder="輸入持有股票張數" />,
    // },
]