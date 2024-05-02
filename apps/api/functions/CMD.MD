# Proxy Install Procedure :

- https://www.makeswift.com/blog/accessing-your-local-nextjs-dev-server-using-https

# To Open SSL Proxy for Cloud Functions:

```sh
NODE_OPTIONS=--dns-result-order=ipv4first npx local-ssl-proxy --key 127.0.0.1-key.pem --cert 127.0.0.1.pem --source 5002 --target 5001
```

# To Open SSL Proxy for Web:

```sh
NODE_OPTIONS=--dns-result-order=ipv4first npx local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 5002 --target 5001
```

# To Open SSL Proxy for IP:

```sh
mkcert <YOUR_IP> && NODE_OPTIONS=--dns-result-order=ipv4first npx local-ssl-proxy --key <YOUR_IP>-key.pem --cert <YOUR_IP>.pem --source 5002 --target 5001
```
