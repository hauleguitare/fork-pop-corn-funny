import { QueryStatus } from "@tanstack/react-query";

export interface ICallBackStatusProps {
    isLoading: boolean;
    status: QueryStatus;
    error: Error | null;
  }