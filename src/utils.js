import { Form, Select } from "antd";
import successData from './data/successfully-done.json'
import {
  SearchOutlined,
  AppstoreAddOutlined,
  InboxOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Search", "2", <SearchOutlined />),
  getItem("Add listings", "3", <AppstoreAddOutlined />),
  getItem("Inbox", "4", <InboxOutlined />),
  getItem("Logout", "5", <LogoutOutlined />),
];


const { Option } = Select;
const suffixSelector = (
  <Form.Item name="suffix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="USD">$</Option>
      <Option value="CNY">¥</Option>
      <Option value="GBP">£</Option>
      <Option value="EUR">€</Option>
    </Select>
  </Form.Item>
);

const successOptions = {
  loop: false,
  autoplay: true,
  animationData: successData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const emptyListing = {
  title: '',
  description: '',
  images: [],
  monthly_price: 0,
  deposit: 0,
  address: {
    first_line: "",
    second_line: "",
    postcode: "",
    city: "",
    country: "",
  }, 
  contract_length: 0,
  coordinates: {
    latitude: "",
    longitude: "",
  },
  key_features: {
    bathrooms: 0,
    beds: 0,
    monthly_bills: 0, //if 0, then bills included
    pets_allowed: false,
    smoking_allowed: false,
    station_nearby: false,
    gym_nearby: false,
  },
  temp_fileList: [] //NOTE: this is NOT a column in the listing table in db. This is used in the addListing component to mantain state of pictures uploaded. 
}


const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export { items, suffixSelector, successOptions, emptyListing, beforeUpload, getBase64 } 