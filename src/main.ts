import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionsFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //全局url前缀
  app.setGlobalPrefix('api');
  //  全局注册校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionsFilter());
  // 设置swagger文档
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
