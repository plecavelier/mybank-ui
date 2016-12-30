<?php
namespace Deployer;
require 'recipe/common.php';

// Configuration

set('repository', 'git@github.com:plecavelier/mybank-ui.git');
set('shared_files', []);
set('shared_dirs', []);
set('writable_dirs', []);

// Servers

serverList('servers.yml');


// Tasks

task('deploy:environment', function() {
    $serverName = get('server.name');
    $envFile = __DIR__."/src/environments/environment.$serverName.ts";
    if (!file_exists($envFile)) {
        throw new \Exception("You must create environment file \"$envFile\" to deploy on server \"$serverName\"");
    }
    // hack : upload function not working
    $content = str_replace('"', '\"', file_get_contents($envFile));
    $dest = "{{release_path}}/src/environments/environment.ts";
    //upload($envFile, $dest);
    run("echo \"$content\" > $dest");
});

task('deploy:npm', function() {
    run('cd {{release_path}} && npm install');
});

task('deploy:build', function() {
    run('cd {{release_path}} && npm run ng build');
});

desc('Deploy your project');
task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:environment',
    'deploy:shared',
    'deploy:writable',
    'deploy:npm',
    'deploy:build',
    //'deploy:vendors',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

after('deploy', 'success');