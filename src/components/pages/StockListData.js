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
        dataIndex: 'cash'
    },
    {
        title: '持有',
        dataIndex: 'own'
    },
]

export const data = [
    {
        key: '1',
        name: '2317',
        basic: '鴻海基本面',
        cash: '投信外資',
        own: '5張',
    },
    {
        key: '2',
        name: '1101',
        basic: '台泥基本面',
        cash: '投信外資買超',
        own: '3張',
    },
    {
        key: '3',
        name: '2330',
        basic: '台積電基本面',
        cash: '投信大買',
        own: '1張',
    },
    // {
    //     name: <input type="text" placeholder="輸入股票代碼或名稱" />,
    //     basic: '',
    //     cash: '',
    //     own: <input type="text" placeholder="輸入持有股票張數" />,
    // },
]