import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = ()=> useDispatch<AppDispatch>();

// custom hooks for useSelector
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;