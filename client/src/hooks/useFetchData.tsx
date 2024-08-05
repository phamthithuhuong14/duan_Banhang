import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "src/axios/instance";
import { useGlobalContext } from "src/context";

const useFetchData = (url: string) => {
  const [datas, setDatas] = useState<any>([]);
  const { setLoading } = useGlobalContext();
  const navigate = useNavigate();

  const handlerGetData = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(url);
      setDatas(data);
    } catch (error) {
      navigate("/NotFound");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  return {
    datas,
  };
};

export default useFetchData;
