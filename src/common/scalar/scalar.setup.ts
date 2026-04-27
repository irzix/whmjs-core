import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('WHMJS API')
    .setDescription(
      'WHMJS (Webhost Management JavaScript) - Open source WHMCS alternative for resellers and hosting providers.\n\n' +
      '[View on GitHub](https://github.com/irzix/whmjs-core)',
    )
    .setVersion('0.0.2')
    .setExternalDoc(
      'GitHub Repository',
      'https://github.com/irzix/whmjs-core',
    )
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  app.use(
    '/api',
    apiReference({
      spec: { content: document },
      theme: 'kepler',
    }),
  );
}
