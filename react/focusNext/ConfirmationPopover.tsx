import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react';
import {
  Popover,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// 组件 Props 类型定义
interface ConfirmationPopoverProps {
  /** 第一个选项的值 */
  value1?: string;
  /** 第二个选项的值 */
  value2?: string;
  /** 选择确认后的回调函数 */
  onConfirm?: (value: string) => void;
  /** 初始是否已确认 */
  defaultConfirmed?: boolean;
  /** 弹框标题 */
  title?: string;
}

// 暴露给父组件的方法类型
export interface ConfirmationPopoverRef {
  /** 设置确认状态 */
  setConfirmed: (confirmed: boolean) => void;
  /** 重置状态 */
  reset: () => void;
  /** 获取当前状态 */
  getStatus: () => {
    isConfirmed: boolean;
    selectedValue: string;
  };
  /** 设置选中值（不触发回调） */
  setSelectedValue: (value: string) => void;
}

const ConfirmationPopover = forwardRef<ConfirmationPopoverRef, ConfirmationPopoverProps>(
  (
    {
      value1 = '版本1',
      value2 = '版本2',
      onConfirm,
      defaultConfirmed = false,
      title = '请选择版本',
    },
    ref: Ref<ConfirmationPopoverRef>
  ) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [isConfirmed, setIsConfirmed] = useState<boolean>(defaultConfirmed);

    const open = Boolean(anchorEl);

    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
      setConfirmed: (confirmed: boolean) => {
        setIsConfirmed(confirmed);
      },
      reset: () => {
        setIsConfirmed(false);
        setSelectedValue('');
      },
      getStatus: () => ({
        isConfirmed,
        selectedValue,
      }),
      setSelectedValue: (value: string) => {
        setSelectedValue(value);
        setIsConfirmed(true);
      },
    }));

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSelectedValue(value);
      setIsConfirmed(true);

      // 通知父组件
      if (onConfirm) {
        onConfirm(value);
      }

      // 延迟关闭，提供视觉反馈
      setTimeout(() => {
        handleClose();
      }, 200);
    };

    return (
      <>
        <IconButton
          onClick={handleClick}
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            padding: 0,
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'transparent',
              transform: 'scale(1.1)',
            },
            transition: 'transform 0.2s',
          }}
        >
          {isConfirmed ? (
            <CheckCircleIcon
              sx={{
                color: '#4caf50',
                fontSize: 24,
                filter: 'drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3))',
              }}
            />
          ) : (
            <InfoIcon
              sx={{
                color: '#f44336',
                fontSize: 24,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                },
              }}
            />
          )}
        </IconButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              elevation: 8,
              sx: {
                mt: 1,
                borderRadius: 2,
              },
            },
          }}
        >
          <Paper sx={{ p: 2.5, minWidth: 220 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup value={selectedValue} onChange={handleChange}>
                <FormControlLabel
                  value={value1}
                  control={<Radio size="small" />}
                  label={<Typography variant="body2">{value1}</Typography>}
                  sx={{
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderRadius: 1,
                    },
                  }}
                />
                <FormControlLabel
                  value={value2}
                  control={<Radio size="small" />}
                  label={<Typography variant="body2">{value2}</Typography>}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderRadius: 1,
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Popover>
      </>
    );
  }
);

ConfirmationPopover.displayName = 'ConfirmationPopover';

export default ConfirmationPopover;
