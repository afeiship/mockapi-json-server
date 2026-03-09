# PM2 使用指南

## 🚀 基本命令

### 启动服务器
```bash
pm2 start ecosystem.config.js
```

### 查看状态
```bash
pm2 list
```

### 查看日志
```bash
pm2 logs mock-api
```

### 重启服务器
```bash
pm2 restart mock-api
```

### 停止服务器
```bash
pm2 stop mock-api
```

### 删除进程
```bash
pm2 delete mock-api
```

## 📊 其他命令

### 清空日志
```bash
pm2 flush
```

### 查看详细信息
```bash
pm2 show mock-api
```

### 监控面板
```bash
pm2 monit
```

## 📝 日志文件

- **错误日志**: `./logs/error.log`
- **输出日志**: `./logs/out.log`