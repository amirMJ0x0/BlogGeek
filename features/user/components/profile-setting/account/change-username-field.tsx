"use client";
import { useState, ChangeEvent, useCallback, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUsername } from "../../../api/change-username";
import { checkUsernameExist } from "../../../api/check-username-exist";
import { Button } from "@/components/ui/button";
import { AtSign, Check, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/features/user/store/useUserStore";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ChangeUsernameField() {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const [username, setUsername] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { showToast } = useCustomToast();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setUsername(user?.username ?? "");
  }, [user]);

  const { mutate: updateUsername, isPending } = useMutation({
    mutationFn: changeUsername,
    onSuccess: (res) => {
      showToast(res.message, "success");
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      setShowButtons(false);
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message =
        error.response?.data?.message || "مشکلی پیش اومد، دوباره تلاش کنید";
      showToast(message, "error");
    },
  });

  const debouncedCheckUsername = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) return;
      setIsChecking(true);
      try {
        const res = await checkUsernameExist(value);
        if (res.statusCode === 200) {
          setIsAvailable(true);
        } else if (res.statusCode === 409) {
          setIsAvailable(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsChecking(false);
      }
    }, 700),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setIsAvailable(null);
    debouncedCheckUsername(value);
  };

  const handleConfirm = () => {
    if (!isAvailable) {
      showToast("این نام کاربری در دسترس نیست!", "error");
      return;
    }
    setIsAvailable(null);
    setIsChecking(false);
    updateUsername({ username });
    router.push(`/@${user?.username}/settings?tab=account`);
  };

  const handleCancel = () => {
    setUsername(user?.username || "");
    setIsAvailable(null);
    setShowButtons(false);
    inputRef.current?.blur();
  };
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto py-6 relative">
      <Label htmlFor="username" className="flex justify-end">
        نام کاربری
      </Label>
      <div className="flex gap-2 items-center">
        <InputGroup>
          <InputGroupInput
            value={username}
            ref={inputRef}
            autoComplete="off"
            id="username"
            onChange={handleChange}
            onFocus={() => setShowButtons(true)}
            onKeyDown={(e) => e.key === "Escape" && handleCancel()}
            disabled={isPending}
            className={`transition-colors ${
              isAvailable === false
                ? "!border-red-400"
                : isAvailable === true
                ? "!border-green-400"
                : "!border-gray-300"
            }`}
          />
          <InputGroupAddon>
            <AtSign />
          </InputGroupAddon>

          <InputGroupAddon align={"inline-end"}>
            {isChecking ? (
              <Spinner scale={".8"} />
            ) : (
              <>
                {isAvailable === true ? (
                  <ThumbsUp className="text-green-500" />
                ) : isAvailable === false ? (
                  <ThumbsDown className="text-red-500" />
                ) : null}
              </>
            )}
          </InputGroupAddon>
        </InputGroup>

        {showButtons && (
          <>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleCancel}
              disabled={isChecking}
            >
              <X size={16} />
            </Button>
            <Button
              size="icon"
              disabled={!isAvailable || isPending}
              onClick={handleConfirm}
            >
              <Check size={16} />
            </Button>
          </>
        )}
      </div>

      <div className="absolute bottom-0 right-24">
        {isAvailable === false && (
          <small className="text-red-500 text-xs">
            این نام کاربری قبلاً استفاده شده است
          </small>
        )}
        {isAvailable === true && (
          <small className="text-green-500 text-xs">
            این نام کاربری در دسترس است
          </small>
        )}
      </div>
    </div>
  );
}
