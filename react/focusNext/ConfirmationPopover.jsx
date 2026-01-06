import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Popover,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  Paper,
  Typography,
  Box
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationPopover = forwardRef(({
  value1 = '版本1',
  value2 = '版本2',
  onConfirm,
  defaultConfirmed = false,
  title = '请选择版本'
}, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(defaultConfirmed);

  const open = Boolean(anchorEl);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    // 设置确认状态
    setConfirmed: (confirmed) => {
      setIsConfirmed(confirmed);
    },
    // 重置状态
    reset: () => {
      setIsConfirmed(false);
      setSelectedValue('');
    },
    // 获取当前状态
    getStatus: () => ({
      isConfirmed,
      selectedValue
    }),
    // 设置选中值（不触发回调）
    setSelectedValue: (value) => {
      setSelectedValue(value);
      setIsConfirmed(true);
    }
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
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
            transform: 'scale(1.1)'
          },
          transition: 'transform 0.2s'
        }}
      >
        {isConfirmed ? (
          <CheckCircleIcon 
            sx={{ 
              color: '#4caf50', 
              fontSize: 24,
              filter: 'drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3))'
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
                '50%': { opacity: 0.7 }
              }
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
              borderRadius: 2
            }
          }
        }}
      >
        <Paper sx={{ p: 2.5, minWidth: 220 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {title}
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup value={selectedValue} onChange={handleChange}>
              <FormControlLabel
                value={value1}
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">{value1}</Typography>
                }
                sx={{ 
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    borderRadius: 1
                  }
                }}
              />
              <FormControlLabel
                value={value2}
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">{value2}</Typography>
                }
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    borderRadius: 1
                  }
                }}
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      </Popover>
    </>
  );
});

ConfirmationPopover.displayName = 'ConfirmationPopover';

export default ConfirmationPopover;
