import {
  DashboardOutlined,
  KeyOutlined,
  UserOutlined,
  TableOutlined,
  BookOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

export const navbarMenu = [
  {
    key: '/dashboard',
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <DashboardOutlined />,
    permissions: [],
  },
  {
    key: '/users',
    label: <Link href="/users">Users</Link>,
    icon: <UserOutlined />,
    permissions: [],
  },
  {
    key: '/books',
    label: <Link href="/books">Books</Link>,
    icon: <BookOutlined />,
    permissions: [],
  },
  {
    key: '/authors',
    label: <Link href="/authors">Authors</Link>,
    icon: <UserOutlined />,
    permissions: [],
  },
  {
    key: '/categories',
    label: <Link href="/categories">Category</Link>,
    icon: <TableOutlined />,
    permissions: [],
  },
  {
    key: '/borrowings',
    label: <Link href="/borrowings">Borrowings</Link>,
    icon: <KeyOutlined />,
    permissions: [],
  },
];
